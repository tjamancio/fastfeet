import React from 'react';

import { Switch } from 'react-router-dom';

import Deliveries from '~/pages/Deliveries';
import Delivery from '~/pages/Delivery';
import Deliveryman from '~/pages/Deliveryman';
import Deliverymen from '~/pages/Deliverymen';
import Problems from '~/pages/Problems';
import Recipient from '~/pages/Recipient';
import Recipients from '~/pages/Recipients';
import SignIn from '~/pages/SignIn';

import Route from './Route';

const Routes = () => (
  <Switch>
    <Route path="/" exact component={SignIn} />

    <Route path="/orders" exact isPrivate component={Deliveries} />
    <Route path="/orders/new" exact isPrivate component={Delivery} />
    <Route path="/orders/:id" exact isPrivate component={Delivery} />

    <Route path="/deliverymen" exact isPrivate component={Deliverymen} />
    <Route path="/deliverymen/new" exact isPrivate component={Deliveryman} />
    <Route path="/deliverymen/:id" exact isPrivate component={Deliveryman} />

    <Route path="/recipients" exact isPrivate component={Recipients} />
    <Route path="/recipients/new" exact isPrivate component={Recipient} />
    <Route path="/recipients/:id" exact isPrivate component={Recipient} />

    <Route path="/problems" exact isPrivate component={Problems} />
  </Switch>
);

export default Routes;
