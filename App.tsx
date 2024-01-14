import React from 'react';
import RootContainer from '@app/navigators/RootContainer/RootContainer';
import {QueryProvider} from '@app/providers/QueryProvider';

function App(): React.JSX.Element {
  return (
    <QueryProvider>
      <RootContainer />
    </QueryProvider>
  );
}

export default App;
