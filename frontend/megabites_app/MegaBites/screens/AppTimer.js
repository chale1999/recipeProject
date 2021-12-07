
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  Dimensions,
  Platform
} from "react-native";

import {
  Picker
} from "@react-native-picker/picker"

const screen = Dimensions.get("window");



// 3 => 03, 10 => 10
const formatNumber = number => `0${number}`.slice(-2);

const getRemaining = time => {
  const hours = Math.floor(Math.floor(time / 60) / 60);
  const minutes = Math.floor((time - (hours * 60 * 60)) / 60);
  const seconds = time - minutes * 60 - hours * 60 * 60;
  return { hours: formatNumber(hours), minutes: formatNumber(minutes), seconds: formatNumber(seconds) };
};

const createArray = length => {
  const arr = [];
  let i = 0;
  while (i < length) {
    arr.push(i.toString());
    i += 1;
  }

  return arr;
};

const AVAILABLE_MINUTES = createArray(10);
const AVAILABLE_SECONDS = createArray(60);
const AVAILABLE_HOURS = createArray(100);

export default class AppTimer extends React.Component {
  state = {
    remainingSeconds: 5,
    isRunning: false,
    selectedHours: "0",
    selectedMinutes: "5",
    selectedSeconds: "0"
  };

  interval = null;

  componentDidUpdate(prevProp, prevState) {
    if (this.state.remainingSeconds === 0 && prevState.remainingSeconds !== 0) {
      this.stop();
    }
  }

  componentWillUnmount() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  start = () => {
    this.setState(state => ({
      remainingSeconds:
        parseInt(state.selectedHours, 10) * 60 * 60 + 
        parseInt(state.selectedMinutes, 10) * 60 +
        parseInt(state.selectedSeconds, 10),
      isRunning: true
    }));

    this.interval = setInterval(() => {
      this.setState(state => ({
        remainingSeconds: state.remainingSeconds - 1
      }));
    }, 1000);
  };

  stop = () => {
    clearInterval(this.interval);
    this.interval = null;
    this.setState({
      remainingSeconds: 5, // temporary
      isRunning: false
    });
  };

  renderPickers = () => (
    <View style={styles.pickerContainer}>
      <Picker
        style={styles.picker}
        itemStyle={styles.pickerItem}
        selectedValue={this.state.selectedHours}
        onValueChange={itemValue => {
          this.setState({ selectedHours: itemValue });
        }}
        mode="dropdown"
      >
        {AVAILABLE_HOURS.map(value => (
          <Picker.Item key={value} label={value} value={value} />
        ))}
      </Picker>
      <Text style={styles.pickerItem}>hr</Text>

      <Picker
        style={styles.picker}
        itemStyle={styles.pickerItem}
        selectedValue={this.state.selectedMinutes}
        onValueChange={itemValue => {
          this.setState({ selectedMinutes: itemValue });
        }}
        mode="dropdown"
      >
        {AVAILABLE_MINUTES.map(value => (
          <Picker.Item key={value} label={value} value={value} />
        ))}
      </Picker>
      <Text style={styles.pickerItem}>min</Text>

      <Picker
        style={styles.picker}
        itemStyle={styles.pickerItem}
        selectedValue={this.state.selectedSeconds}
        onValueChange={itemValue => {
          this.setState({ selectedSeconds: itemValue });
        }}
        mode="dropdown"
      >
        {AVAILABLE_SECONDS.map(value => (
          <Picker.Item key={value} label={value} value={value} />
        ))}
      </Picker>
      <Text style={styles.pickerItem}>sec</Text>

    </View>
  );

  render() {
    const { hours, minutes, seconds } = getRemaining(this.state.remainingSeconds);

    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        {this.state.isRunning ? ( this.state.remainingSeconds < 3600 ? 
          (<Text style={styles.timerText}>{`${minutes}:${seconds}`} </Text>) :
          (<Text style={styles.timerText}>{`${hours}:${minutes}:${seconds}`}</Text>)
        ) : (
          this.renderPickers()
        )}
        {this.state.isRunning ? (
          <TouchableOpacity
            onPress={this.stop}
            style={[styles.button, styles.buttonStop]}
          >
            <Text style={[styles.buttonText, styles.buttonTextStop]}>Stop</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={this.start} style={styles.button}>
            <Text style={styles.buttonText}>Start</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  button: {
    borderWidth: 10,
    borderColor: "#f3834e",
    width: screen.width / 2,
    height: screen.width / 2,
    borderRadius: screen.width / 2,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30
  },
  buttonStop: {
    borderColor: "#da3135"
  },
  buttonText: {
    fontSize: 45,
    color: "#f3834e"
  },
  buttonTextStop: {
    color: "#da3135"
  },
  timerText: {
    color: "black",
    fontSize: 90
  },
  picker: {
    width: 90,
    color: "black",
    // alignItems: "right",  VERY BAD CODE: BREAKS ANDROID APP
    ...Platform.select({
      android: {
        color: "black",
        backgroundColor: "white",
        marginLeft: 10
      }
    })
  },
  pickerItem: {
    color: "black",
    fontSize: 20
  },
  pickerContainer: {
    flexDirection: "row",
    alignItems: "center"
  }
});