import React, { Component } from 'react';
import { View, FlatList, ActivityIndicator } from 'react-native';

import { parseISO, format } from 'date-fns';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux';

import api from '~/services/api';
import { navigate } from '~/services/RootNavigation';
import { colors } from '~/styles';

import {
  Container,
  Box,
  Product,
  ProductName,
  Timeline,
  TimelineItem,
  Line,
  Circle,
  CircleText,
  Detais,
  Label,
  Value,
  SeeDetais,
  SeeDetaisText,
  Footer,
} from './styles';

class DeliveryList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: props.status,
      loading: true,
      deliveries: [],
      page: 1,
      perPage: 10,
    };
  }

  componentDidMount() {
    this.load();
  }

  componentDidUpdate(prevProps) {
    const { status } = this.props;
    if (prevProps.status !== status) {
      this.updateStatus();
    }
  }

  updateStatus = () => {
    this.setState({ page: 1, deliveries: [] }, () => this.load());
  };

  load = async () => {
    const { page, perPage, deliveries } = this.state;
    const { user, status } = this.props;

    this.setState({ loading: true });

    const delivered = status === 'pendente' ? 0 : 1;

    const { data } = await api.get(
      `/deliverymen/${user.id}/deliveries?page=${page}&per_page=${perPage}&delivered=${delivered}`
    );

    this.setState({
      deliveries: [...deliveries, ...data],
      loading: false,
      page: data.length > 0 ? page + 1 : page,
    });
  };

  handleSeeDetaisClick = (delivery) => {
    navigate('DeliveryDetail', { delivery });
  };

  keyExtractor = (item) => String(item.id);

  renderItem = ({ item }) => {
    return (
      <>
        <Box>
          <Product>
            <Icon name="local-shipping" color={colors.primary} size={20} />
            <ProductName>{item.product}</ProductName>
          </Product>
          <View>
            <Timeline>
              <TimelineItem>
                <Circle completed />
                <CircleText>
                  Aguardando
                  {'\n'}
                  retirada
                </CircleText>
              </TimelineItem>
              <TimelineItem>
                <Circle completed={item.start_date} />
                <CircleText>retirada</CircleText>
              </TimelineItem>
              <TimelineItem>
                <Circle completed={item.end_date} />
                <CircleText>Entregue</CircleText>
              </TimelineItem>
            </Timeline>
            <Line />
          </View>

          <Detais>
            <View>
              <Label>Data</Label>
              <Value>{format(parseISO(item.createdAt), 'dd/MM/yyyy')}</Value>
            </View>
            <View>
              <Label>Cidade</Label>
              <Value numberOfLines={1}>{item.recipient.city}</Value>
            </View>

            <SeeDetais
              activeOpacity={0.7}
              onPress={() => this.handleSeeDetaisClick(item)}>
              <SeeDetaisText>Ver detalhes</SeeDetaisText>
            </SeeDetais>
          </Detais>
        </Box>
      </>
    );
  };

  renderFooter = () => {
    const { loading } = this.state;
    if (!loading) {
      return null;
    }
    return (
      <Footer>
        <ActivityIndicator />
      </Footer>
    );
  };

  render() {
    const { deliveries } = this.state;
    return (
      <Container>
        <FlatList
          data={deliveries}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem}
          ListFooterComponent={this.renderFooter}
          onEndReached={this.load}
          onEndReachedThreshold={0.1}
        />
      </Container>
    );
  }
}

DeliveryList.propTypes = {
  status: PropTypes.string.isRequired,
  user: PropTypes.shape({
    id: PropTypes.number,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user.profile,
});

export default connect(mapStateToProps)(DeliveryList);
