import React, { Component } from 'react';
import { FlatList, Text, StyleSheet } from 'react-native';

import EventCard from './EventCard';
import { now } from 'moment';
import ActionButton from 'react-native-action-button';

const styles = StyleSheet.create({
  list: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#F3F3F3'
  },
});

class EventList extends Component {

  state = {
    events: []
  }

  componentDidMount() {
    setInterval(() => {
      this.setState({
        events: this.state.events.map(evt => ({
          ...evt,
          timer: Date.now(),
        }))
      });
    }, 1000);

    const events = require('./db.json').events.map(evt => ({
      ...evt,
      date: new Date(evt.date),
    }));
    this.setState({ events })
  }

  handleAddEvent = () => {
    this.props.navigation.navigate('form');
  }


  render () {
    return [
      <FlatList
        key="flatlist"
        style={styles.list}
        data={this.state.events}
        renderItem={({ item }) => <EventCard event={item} />}
        keyExtractor={item => item.id}
      />,
      <ActionButton
        key='fab'
        onPress={this.handleAddEvent}
        buttonColor="rgba(231, 76, 60, 1)"
      />
    ]
  }
}

export default EventList;
