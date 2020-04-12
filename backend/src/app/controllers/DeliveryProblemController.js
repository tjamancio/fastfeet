import * as Yup from 'yup';
import { Op } from 'sequelize';
import DeliveryProblem from '../models/DeliveryProblem';

class DeliveryProblemController {
  async index(req, res) {
    const { q, page = 1 } = req.query;
    const problems = await DeliveryProblem.findAll({
      attributes: ['id', 'description', 'delivery_id'],
      where: {
        description: {
          [Op.iLike]: `%${q || ''}%`,
        },
      },
      order: ['delivery_id'],
      limit: 20,
      offset: (page - 1) * 20,
    });

    return res.json(problems);
  }

  async deliveryProblems(req, res) {
    const { deliveryId } = req.params;
    const problems = await DeliveryProblem.findAll({
      where: {
        delivery_id: deliveryId,
      },
    });

    return res.json(problems);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      description: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { description } = req.body;
    const { deliveryId } = req.params;

    const deliveryProblem = await DeliveryProblem.create({
      delivery_id: deliveryId,
      description,
    });

    return res.json(deliveryProblem);
  }
}

export default new DeliveryProblemController();
