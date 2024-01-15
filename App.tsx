import React, {useEffect} from 'react';
import RootContainer from '@app/navigators/RootContainer/RootContainer';
import {QueryProvider} from '@app/providers/QueryProvider';
import RNBootSplash from 'react-native-bootsplash';

function App(): React.JSX.Element {
  useEffect(() => {
    setTimeout(() => {
      RNBootSplash.hide({fade: true});
    }, 2000);
  }, []);

  return (
    <QueryProvider>
      <RootContainer />
    </QueryProvider>
  );
}

export default App;
