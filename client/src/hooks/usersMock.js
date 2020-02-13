const usersMock = () => new Promise((res, _rej) => {
  setTimeout(() => {
    res({
      data: [
        {
          name: 'A',
          cognitoId: '1',
        },
        {
          name: 'B',
          cognitoId: '2',
        },
        {
          name: 'C',
          cognitoId: '3',
        },
      ],
    });
  }, 1000);
});

export default usersMock;
