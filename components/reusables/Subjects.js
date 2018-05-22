import React, {Component} from 'react';
import {View, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import String from './String';
import ModalDropdown from 'react-native-modal-dropdown';

const colors = ['#E66464', '#F4BDDB', '#97E6F0', '#BDF287', '#E9905C'];
const Subject = props => {
  let backgroundColor = colors[props.random];
  return (
    <TouchableOpacity
      {...props}
      style={{
        backgroundColor,
        padding: 5,
        borderRadius: 5,
        margin: 5,
        borderWdith: 1,
        borderColor: '#979797',
      }}>
      <String style={{color: '#fafafa'}} text={props.subject} />
    </TouchableOpacity>
  );
};

class Subjects extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subjects: [],
      availableSubjects: [
        'College Algebra 1',
        'Chemistry 3',
        'Physics 2',
        'Science and Health 1',
        'Geometry 3',
      ],
    };
  }
  render() {
    return (
      <View style={styles.container}>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            marginBottom: 5,
          }}>
          {this.state.subjects.map((subject, index) => {
            return (
              <Subject
                onPress={e => this._popSubject(index)}
                key={index}
                index={index}
                subject={subject}
                random={index % (colors.length-1)}
              />
            );
          })}
        </View>
        <ModalDropdown
          style={{
            width: 80,
            borderWidth: 1,
            borderColor: '#979797',
            borderRadius: 5,
            padding: 5,
            alignSelf: 'center',
          }}
          defaultValue={'Add Subject'}
          dropdownStyle={{
            width: '80%',
          }}
          onSelect={(index, value) => {
            let subjects = this.state.subjects;
            subjects.push(value);
            this.setState({subjects});
          }}
          renderButtonText={() => 'Add Subject'}
          options={this.state.availableSubjects}
        />
      </View>
    );
  }
  _popSubject = index => {
    let subjects = this.state.subjects;
    subjects.pop(index);
    this.setState({subjects}, () =>
      this.props.allSubjects(this.state.subjects),
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    marginBottom: 10,
  },
});

export default Subjects;
