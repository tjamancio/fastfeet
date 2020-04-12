import * as Yup from 'yup';
import { Op } from 'sequelize';
import Recipient from '../models/Recipient';

const schema = Yup.object().shape({
  name: Yup.string().required(),
  street: Yup.string().required(),
  number: Yup.number(),
  complement: Yup.string(),
  state: Yup.string().required(),
  city: Yup.string().required(),
  postalcode: Yup.string()
    .length(8)
    .required(),
});

class RecipientController {
  async index(req, res) {
    const { q, page = 1 } = req.query;

    const recipients = await Recipient.findAll({
      where: {
        name: {
          [Op.iLike]: `%${q || ''}%`,
        },
      },
      limit: 20,
      offset: (page - 1) * 20,
    });
    return res.json(recipients);
  }

  async show(req, res) {
    const recipients = await Recipient.findByPk(req.params.id);
    return res.json(recipients);
  }

  async store(req, res) {
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }
    const recipient = await Recipient.create(req.body);

    return res.json(recipient);
  }

  async update(req, res) {
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const recipient = await Recipient.findByPk(req.params.id);

    await recipient.update(req.body);

    return res.json(recipient);
  }

  async destroy(req, res) {
    const recipient = await Recipient.findByPk(req.params.id);
    await recipient.destroy();
    return res.json({ ok: true });
  }
}

export default new RecipientController();
