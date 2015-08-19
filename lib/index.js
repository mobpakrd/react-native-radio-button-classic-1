var React = require('react-native');

var {
  StyleSheet,
  Component,
  View,
  TouchableWithoutFeedback
} = React;

var window = require('Dimensions').get('window');

const styles = StyleSheet.create({
  outerCircle: {
    height: 20,
    width: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2 / window.scale,
    borderRadius: 10,
    backgroundColor: 'transplant'
  },
  innerCircle: {
    height: 16,
    width: 16,
    borderRadius: 8
  }
});

class Circle extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { color, isSelected, selectedColor } = this.props;

    let innerCircle;
    let appliedColor;

    if (isSelected) {
      appliedColor = selectedColor;
      innerCircle = <View style={[styles.innerCircle, { backgroundColor: appliedColor }]}/>;
    } else {
      appliedColor = color;
      innerCircle = null;
    }

    return (
      <View style={{ padding: 10 }}>
        <View style={[styles.outerCircle, { borderColor: appliedColor }]}>
          {innerCircle}
        </View>
      </View>
    );
  }
}

Circle.propTypes = {
  color: React.PropTypes.string,
  selectedColor: React.PropTypes.string,
  isSelected: React.PropTypes.bool
};

Circle.defaultProps = {
  isSelected: false
};

class Radio extends Component {
  constructor(props) {
    super(props);
    this.state = { selectedIndex: -1 }
  }

  _onSelect(index) {
    const { onSelect } = this.props;
    this.setState({
      selectedIndex: index
    });
    onSelect(index);
  }

  render() {
    const { selectedIndex } = this.state;
    const targetIndex = selectedIndex !== -1? selectedIndex : this.props.defaultSelect;

    const children = React.Children.map(this.props.children, (child, index) => {
      if (child.type.name == 'Option') {
        return React.cloneElement(child, {
          onPress: () => this._onSelect(index),
          isSelected: index == targetIndex
        });
      }

      return child;
    });

    return (
      <View>
        {children}
      </View>
    );
  }
}

Radio.propTypes = {
  onSelect: React.PropTypes.func.isRequired,
  defaultSelect: React.PropTypes.number
};

Radio.defaultProps = {
  defaultSelect: -1
};

class Option extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { onPress, isSelected, color, selectedColor, children } = this.props;

    return (
      <TouchableWithoutFeedback onPress={onPress}>
        <View style={{flexDirection: 'row'}}>
          <Circle color={color} selectedColor={selectedColor} isSelected={isSelected}/>
          <View style={{ flex: 1 }}>
            {children}
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

Option.propTypes = {
  onPress: React.PropTypes.func,
  isSelected: React.PropTypes.bool,
  color: React.PropTypes.string,
  selectedColor: React.PropTypes.string
};

Radio.Option = Option;
module.exports = Radio;