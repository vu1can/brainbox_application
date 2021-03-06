import React, {Component} from 'react';
import {AccountType} from '../../lib/constants';
import {
  Header,
  String,
  TextField,
  Subjects,
  LocalImage,
  Button,
} from '../reusables';
import {
  ScrollView,
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Alert,
} from 'react-native';
import {connect} from 'react-redux';
import Actions from '../../actions';
const {getUserInformation, goToAccountSettings, updateUserInfo} = Actions;

class ClientAccountSettingsEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: '',
      lastname: '',
      email: '',
      contact: '',
      accountType: AccountType.Client,
      isMale: false,
    };
  }
  componentWillMount() {
    this.props.getUserInformation();
  }
  componentWillReceiveProps(nextProps) {
    const {user} = nextProps;
    if (user) {
      if (user.birthday) {
        birthday = new Date(user.birthday);
        data = birthday.toString().split(' ');
        birthdayString = `${data[1]} ${data[2]}, ${data[3]}`;
      }
      this.setState({
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        address: user.address,
        contact: user.contact + '',
        isMale: user.gender == 0 ? true : false,
        birthday: (user.birthday && birthday) || null,
        birthdayString: (user.birthday && birthdayString) || '',
      });
    }
  }
  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <TouchableOpacity
            onPress={this.props.goToAccountSettings}
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
              width: '100%',
            }}>
            <LocalImage
              source={require('../../assets/images/icons/backButton.png')}
              resize
              newWidth={15}
              newHeight={15}
              style={{
                marginRight: 10,
              }}
            />
            <Text>BACK</Text>
          </TouchableOpacity>
          <LocalImage
            source={require('../../assets/images/avatars/defaultTutorAvatar.png')}
            resize
            newWidth={150}
            newHeight={160}
            style={{
              marginRight: 10,
              alignSelf: 'center',
            }}
          />
          <View
            style={{
              flexDirection: 'row',
            }}>
            <TextField
              placeholder={'Firstname'}
              onChangeText={value => this.setState({firstname: value})}
              fontSize={10}
              style={{
                flex: 1,
                marginBottom: 10,
              }}
              value={this.state.firstname}
            />
            <TextField
              placeholder={'Lastname'}
              onChangeText={value => this.setState({lastname: value})}
              fontSize={10}
              style={{
                flex: 1,
                marginBottom: 10,
              }}
              value={this.state.lastname}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
              marginBottom: 10,
            }}>
            <String
              text={'Sex: '}
              fontSize={14}
              style={{
                marginRight: 10,
                marginBottom: 10,
              }}
            />
            <TouchableOpacity
              onPress={() => this.setState({isMale: false})}
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: 20,
                width: 60,
                height: 20,
                backgroundColor: !this.state.isMale ? '#BDF287' : '#fff',
                borderRadius: 5,
              }}>
              <String text={'Female'} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.setState({isMale: true})}
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                width: 60,
                height: 20,
                backgroundColor: this.state.isMale ? '#BDF287' : '#fff',
                borderRadius: 5,
              }}>
              <String text={'Male'} />
            </TouchableOpacity>
          </View>
          <TextField
            placeholder={'Email'}
            onChangeText={value => this.setState({email: value})}
            fontSize={10}
            style={{
              width: '100%',
              marginBottom: 10,
            }}
            value={this.state.email}
          />
          <TextField
            placeholder={'Birthday'}
            datepicker
            focusCallback={({newDate, newDateString}) =>
              this.setState({birthday: newDate, birthdayString: newDateString})
            }
            onChangeText={value => this.setState({birthday: value})}
            fontSize={10}
            style={{
              width: '100%',
              marginBottom: 10,
            }}
            value={this.state.birthdayString}
          />
          <TextField
            placeholder={'Address'}
            onChangeText={value => this.setState({address: value})}
            fontSize={10}
            style={{
              width: '100%',
              marginBottom: 10,
            }}
            value={this.state.address}
          />
          <TextField
            placeholder={'Contact'}
            onChangeText={value => this.setState({contact: value})}
            keyboardType="numeric"
            fontSize={10}
            style={{
              width: '100%',
              marginBottom: 10,
            }}
            value={this.state.contact}
          />
          {this.state.accountType == AccountType.Tutor
            ? [
                <String
                  text={'Subjects:'}
                  style={{
                    width: '100%',
                    marginBottom: 10,
                  }}
                />,
                <Subjects
                  style={{width: '100%', marginTop: 10, marginBottom: 10}}
                />,
              ]
            : null}
          <Button
            onPress={this.updateUser}
            text={'Save'}
            style={{
              marginTop: 20,
              marginBottom: 10,
              alignSelf: 'center',
            }}
          />
        </View>
      </ScrollView>
    );
  }
  updateUser = () => {
    //sanitize data
    let data = this.state;
    delete data['accountType'];
    data.gender = data.isMale ? 0 : 1;
    delete data['isMale'];
    delete data['birthdayString'];

    this.props.updateUserInfo(data);
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    padding: 10,
  },
});

const mapStateToProps = state => {
  return {
    user: state.ResourcesReducer && state.ResourcesReducer.user,
  };
};

export default connect(mapStateToProps, {
  getUserInformation,
  goToAccountSettings,
  updateUserInfo,
})(ClientAccountSettingsEdit);
