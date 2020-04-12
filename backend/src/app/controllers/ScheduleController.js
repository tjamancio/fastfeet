import { Op } from 'sequelize';
import * as Yup from 'yup';
import { format, startOfDay, endOfDay } from 'date-fns';
import Delivery from '../models/Delivery';
import Recipient from '../models/Recipient';

class ScheduleController {
  async index(req, res) {
    const { page = 1, per_page = 20, delivered } = req.query;
    const deliveries = await Delivery.findAll({
      where: {
        deliveryman_id: req.params.deliverymanId,
        canceled_at: null,
        end_date: {
          [delivered === '1' ? Op.ne : Op.eq]: null,
        },
      },
      limit: per_page,
      offset: (page - 1) * per_page,
      order: ['id'],
      include: {
        model: Recipient,
        as: 'recipient',
      },
    });

    return res.json(deliveries);
  }

  async withdraw(req, res) {
    const { deliverymanId, deliveryId } = req.params;

    const date = new Date();

    if (date.getHours < 8 || format(date, 'HHmm') > 1800) {
      return res
        .status(400)
        .json({ error: 'Withdraw allowed only between 08h and 18h' });
    }

    const total = await Delivery.count({
      where: {
        id: deliveryId,
        deliveryman_id: deliverymanId,
        start_date: {
          [Op.between]: [startOfDay(date), endOfDay(date)],
        },
        canceled_at: null,
      },
    });

    if (total > 4) {
      return res
        .status(400)
        .json({ error: 'You can withdraw just 5 items per day' });
    }

    const delivery = await Delivery.findOne({
      where: {
        id: deliveryId,
        deliveryman_id: deliverymanId,
        start_date: null,
        canceled_at: null,
      },
    });

    await delivery.update({
      start_date: date,
    });

    return res.json(delivery);
  }

  async finish(req, res) {
    const schema = Yup.object().shape({
      signature_id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { deliverymanId, deliveryId } = req.params;
    const { signature_id } = req.body;

    const delivery = await Delivery.findOne({
      where: {
        id: deliveryId,
        deliveryman_id: deliverymanId,
        canceled_at: null,
      },
    });

    if (!delivery) {
      return res.status(400).json({ error: 'Delivery not found' });
    }

    if (delivery.end_date) {
      return res.status(400).json({ error: 'Delivery already delivered' });
    }

    await delivery.update({
      signature_id,
      start_date: new Date(),
      end_date: new Date(),
    });

    return res.json(delivery);
  }
}

export default new ScheduleController();
