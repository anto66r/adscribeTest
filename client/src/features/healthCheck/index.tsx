import React, { FunctionComponent } from 'react';

const HealthCheck: FunctionComponent = () => <>{`OK (${process.env.VERSION || '-'})`}</>;

export default HealthCheck;
