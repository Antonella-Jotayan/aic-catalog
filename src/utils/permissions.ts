import {Platform} from 'react-native';
import {check, PERMISSIONS, request, RESULTS} from 'react-native-permissions';

const requestCalendarPermission = async () => {
  try {
    if (Platform.OS === 'ios') {
      check(PERMISSIONS.IOS.CALENDARS_WRITE_ONLY)
        .then(result => {
          switch (result) {
            case RESULTS.UNAVAILABLE:
              console.log(
                'This feature is not available (on this device / in this context)',
              );
              break;
            case RESULTS.DENIED:
              console.log(
                'The permission has not been requested / is denied but requestable',
              );
              request(PERMISSIONS.IOS.CALENDARS_WRITE_ONLY).then(result => {
                console.log('result', result);
              });

              break;
            case RESULTS.GRANTED:
              console.log('The permission is granted');
              break;
            case RESULTS.BLOCKED:
              console.log(
                'The permission is denied and not requestable anymore',
              );
              break;
          }
        })
        .catch(error => {
          throw error;
        });
    }
  } catch (err) {
    console.warn(err);
  }
};

export const PermissionUtils = {
  requestCalendarPermission,
};
