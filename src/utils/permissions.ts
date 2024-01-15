import {Platform} from 'react-native';
import {check, PERMISSIONS, RESULTS, request} from 'react-native-permissions';

const requestCalendarPermissions = async () => {
  try {
    if (Platform.OS === 'ios') {
      const result = await check(PERMISSIONS.IOS.CALENDARS);
      switch (result) {
        case RESULTS.UNAVAILABLE:
          throw new Error(
            'This feature is not available (on this device / in this context)',
          );
        case RESULTS.DENIED:
          try {
            await request(PERMISSIONS.IOS.CALENDARS);
          } catch (error) {
            throw new Error(
              'The permission has not been requested / is denied but requestable',
            );
          }
          break;
        case RESULTS.GRANTED:
          console.log('The permission is granted');
          break;
        case RESULTS.BLOCKED:
          throw new Error(
            'The permission is denied and not requestable anymore',
          );
      }
    }
  } catch (err) {
    console.warn(err);
  }
};

export const PermissionUtils = {
  requestCalendarPermissions,
};
