import React, { FunctionComponent } from 'react';

const HealthCheck: FunctionComponent = () => <>{`OK (${process.env.REACT_APP_VERSION || '-'})`}</>;

export default HealthCheck;
