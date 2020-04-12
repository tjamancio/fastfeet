import Mail from '../../lib/Mail';

class NewDeliveryMail {
  get key() {
    return 'newDeliveryMail';
  }

  async handle({ data }) {
    const { deliveryman, delivery } = data;
    Mail.sendMail({
      to: `${deliveryman.name} <${deliveryman.email}>`,
      subject: 'Nova encomenda',
      template: 'newDelivery',
      context: {
        name: deliveryman.name,
        product: delivery.product,
      },
    });
  }
}

export default new NewDeliveryMail();
