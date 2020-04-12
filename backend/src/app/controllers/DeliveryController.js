import * as Yup from 'yup';
import { Op } from 'sequelize';
import Delivery from '../models/Delivery';
import DeliveryMan from '../models/DeliveryMan';
import Recipient from '../models/Recipient';
import Queue from '../../lib/Queue';
import NewDeliveryMail from '../jobs/NewDeliveryMail';
import DeliveryProblem from '../models/DeliveryProblem';
import File from '../models/File';

const schema = Yup.object().shape({
  recipient_id: Yup.number().required(),
  deliveryman_id: Yup.number().required(),
  product: Yup.string().required(),
});

class DeliveryController {
  async index(req, res) {
    const { q, page = 1 } = req.query;
    const deliveries = await Delivery.findAll({
      attributes: ['id', 'product', 'start_date', 'end_date', 'canceled_at'],
      where: {
        product: {
          [Op.iLike]: `%${q || ''}%`,
        },
      },
      order: ['id'],
      limit: 20,
      offset: (page - 1) * 20,
      include: [
        {
          model: Recipient,
          as: 'recipient',
          attributes: [
            'id',
            'name',
            'postalcode',
            'street',
            'number',
            'city',
            'state',
          ],
        },
        {
          model: DeliveryMan,
          as: 'deliveryman',
          attributes: ['id', 'name'],
          include: [
            {
              model: File,
              as: 'avatar',
              attributes: ['id', 'path', 'url'],
            },
          ],
        },
        {
          model: File,
          as: 'signature',
          attributes: ['id', 'path', 'url'],
        },
      ],
    });

    return res.json(deliveries);
  }

  async show(req, res) {
    const delivery = await Delivery.findByPk(req.params.id, {
      attributes: ['id', 'product', 'recipient_id', 'deliveryman_id'],
      include: [
        {
          model: Recipient,
          as: 'recipient',
          attributes: ['id', 'name'],
        },
        {
          model: DeliveryMan,
          as: 'deliveryman',
          attributes: ['id', 'name'],
        },
      ],
    });
    return res.json(delivery);
  }

  async store(req, res) {
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const deliveryman = await DeliveryMan.findByPk(req.body.deliveryman_id);
    const delivery = await Delivery.create(req.body);

    await Queue.add(NewDeliveryMail.key, {
      deliveryman,
      delivery,
    });

    return res.json(delivery);
  }

  async update(req, res) {
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const delivery = await Delivery.findByPk(req.params.id);
    await delivery.update(req.body);
    return res.json(delivery);
  }

  async destroy(req, res) {
    const delivery = await Delivery.findByPk(req.params.id);
    await delivery.destroy();

    return res.json({ ok: true });
  }

  async cancel(req, res) {
    const { problemId } = req.params;

    const problem = await DeliveryProblem.findByPk(problemId);
    const delivery = await Delivery.findByPk(problem.delivery_id);

    await delivery.update({
      canceled_at: new Date(),
    });
    return res.json({ ok: true });
  }
}

export default new DeliveryController();
