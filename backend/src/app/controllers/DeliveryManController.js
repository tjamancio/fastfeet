import * as Yup from 'yup';
import { Op } from 'sequelize';
import DeliveryMan from '../models/DeliveryMan';
import File from '../models/File';

const schema = Yup.object().shape({
  name: Yup.string().required(),
  email: Yup.string()
    .email()
    .required(),
  avatar_id: Yup.number().required(),
});

class DeliveryManController {
  async index(req, res) {
    const { q, page = 1 } = req.query;

    const deliverymen = await DeliveryMan.findAll({
      where: {
        name: {
          [Op.iLike]: `%${q || ''}%`,
        },
      },
      limit: 20,
      offset: (page - 1) * 20,
      attributes: ['id', 'name', 'email', 'avatar_id'],
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['name', 'path', 'url'],
        },
      ],
    });

    res.json(deliverymen);
  }

  async show(req, res) {
    const deliveryman = await DeliveryMan.findByPk(req.params.id, {
      attributes: ['id', 'name', 'email', 'avatar_id'],
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['id', 'name', 'path', 'url'],
        },
      ],
    });
    return res.json(deliveryman);
  }

  async signin(req, res) {
    const { email } = req.body;
    const deliveryman = await DeliveryMan.findOne({
      where: {
        email,
      },
      attributes: ['id', 'name', 'email', 'avatar_id', 'created_at'],
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['id', 'name', 'path', 'url'],
        },
      ],
    });

    if (!deliveryman) {
      return res.status(401).json('Usuário não encontrado!');
    }

    return res.json(deliveryman);
  }

  async store(req, res) {
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const deliveryman = await DeliveryMan.create(req.body);
    return res.json(deliveryman);
  }

  async update(req, res) {
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const deliveryman = await DeliveryMan.findByPk(req.params.id);

    await deliveryman.update(req.body);
    return res.json(deliveryman);
  }

  async destroy(req, res) {
    const deliveryman = await DeliveryMan.findByPk(req.params.id);
    await deliveryman.destroy();
    return res.json({ ok: true });
  }
}

export default new DeliveryManController();
