import React, { Component } from "react";
import { View, Animated, PanResponder, Dimensions } from "react-native";
import axios from "axios";
// import EventCard from "./EventCard";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SWIPE_THRESHOLD = 0.25 * SCREEN_WIDTH;
const SWIPE_OUT_DURATION = 250;

var agendaURL = "https://startupweeknavigator.herokuapp.com/agenda";
var secondSwipeURL = "https://startupweeknavigator.herokuapp.com/secondswipeevents";

class EventDeck extends Component {
  static defaultProps = {
    onSwipeRight: () => {}
,
    onSwipeLeft: () => {}
  }

  constructor(props) {
    super(props);
    this.state = {
      card: []
    };

    const position = new Animated.ValueXY();
    const panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gesture) => {
        position.setValue({ x: gesture.dx, y: gesture.dy });
      },
      onPanResponderRelease: (event, gesture) => {
        if (gesture.dx > SWIPE_THRESHOLD) {
          this.forceSwipe("right");
        } else if (gesture.dx < -SWIPE_THRESHOLD) {
          this.forceSwipe("left");
        } else {
          this.resetPosition();
        }
      }
    });

    this.state = { panResponder, position, index: 0 };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data !== this.props.data) {
      this.setState({ index: 0 });
    }
  }

  addEventToAgenda = (item) => {
    axios
      .post(agendaURL, {
        eventName: item.eventName,
        eventDescription: item.eventDescription,
        date: item.date,
        time: item.time,
        register: item.register,
        tickets: item.tickets,
        address: item.address,
        image: item.image
      })
      .then(function(response) {
        console.log(response);
      })
      .catch(err => console.log(err))
  };

  addToSecondSwipeURL = (item) => {
    axios
      .post(secondSwipeURL, {
        eventName: item.eventName,
        eventDescription: item.eventDescription,
        date: item.date,
        time: item.time,
        register: item.register,
        tickets: item.tickets,
        address: item.address,
        image: item.image
      })
      .then(function(response) {
        console.log(response);
      })
      .catch(err => console.log(err))
  };

  forceSwipe(direction) {
    const x = direction === "right" ? SCREEN_WIDTH : -SCREEN_WIDTH;
    Animated.timing(this.state.position, {
      toValue: { x, y: 0 },
      duration: SWIPE_OUT_DURATION
    }).start(() => this.onSwipeComplete(direction));
  }

  onSwipeComplete(direction) {
    const { onSwipeLeft, onSwipeRight } = this.props;
    const item = this.props.data[this.state.index];
    console.log(item);

    direction === "right" ? onSwipeRight(item) : onSwipeLeft(item);
    this.state.position.setValue({ x: 0, y: 0 });
    this.setState({ index: this.state.index + 1 });

    direction === "right" ? this.addEventToAgenda(item) : this.addToSecondSwipeURL(item);
    console.log(this.state);
  }

  resetPosition() {
    Animated.spring(this.state.position, {
      toValue: { x: 0, y: 0 }
    }).start();
  }

  getCardStyle() {
    const { position } = this.state;
    const rotate = position.x.interpolate({
      inputRange: [-SCREEN_WIDTH * 1.5, 0, SCREEN_WIDTH * 1.5],
      outputRange: ["-120deg", "0deg", "120deg"]
    });

    return {
      ...position.getLayout(),
      transform: [{ rotate }]
    };
  }

  renderCards() {
    if (this.state.index >= this.props.data.length) {
      return this.props.renderNoMoreCards();
    }


    return this.props.data.map((event, current) => {
      if (current < this.state.index) {return null; }

      if (current === this.state.index) {
        return (
          <Animated.View
            key={event.id}
            style={[this.getCardStyle(), styles.cardStyle]}
            {...this.state.panResponder.panHandlers}
          >
            {this.props.renderCard(event)}
          </Animated.View>
        );
      }

      return (
        <Animated.View key={event.id} style={styles.cardStyle}>
        {this.props.renderCard(event)}
        </Animated.View>
      );
    }).reverse();
  }

  render() {
    return (
      <View>
      {this.renderCards()}
      </View>
      );
  }
}

const styles = {
  cardStyle: {
    position: "absolute",
    width: SCREEN_WIDTH
  }
}

export default EventDeck;
