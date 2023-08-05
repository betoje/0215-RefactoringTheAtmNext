const ATMDeposit = ({ onChange, isDeposit, isValid }) => {
  const choice = ['Depósito', 'Retiro'];
  const {Form, Button} = ReactBootstrap;
  console.log(`ATM isDeposit: ${isDeposit}`);
  return (
    <>
      <p></p>
      <Form.Group>
        <Form.Label>Ingrese el monto:</Form.Label>
        <Form.Control id="number-input" type="number" placeholder="valor" onChange={onChange} />
      </Form.Group>
      <p></p>
      <Button variant="secondary" type="submit" disabled={!isValid} value="Submit" id="submit-input">
        Confirmar {choice[Number(!isDeposit)]}
      </Button>
    </>
  );
};

const Account = () => {
  const [deposit, setDeposit] = React.useState(0);
  const [totalState, setTotalState] = React.useState(0);
  const [isDeposit, setIsDeposit] = React.useState(true);
  const [atmMode, setAtmMode] = React.useState('');
  const [validTransaction, setValidTransaction] = React.useState(false);
  const {Form} = ReactBootstrap; 

  let status = `Balance de Cuenta $ ${totalState} `;
  console.log(`Account Rendered with isDeposit: ${isDeposit}`);
  const handleChange = (event) => {
    let eTargetValue = event.target.value;
    console.log(Number(eTargetValue));
    if (Number(eTargetValue) <= 0) {
      return setValidTransaction(false);
    }
    if (atmMode === 'Cash Back' && Number(event.target.value) > totalState) {
      setValidTransaction(false);
    } else {
      setValidTransaction(true);
    }
    setDeposit(Number(eTargetValue));
  };
  const handleSubmit = (event) => {
    let newTotal = isDeposit ? totalState + deposit : totalState - deposit;
    setTotalState(newTotal);
    setValidTransaction(false);
    event.preventDefault();
  };

  const handleModeSelect = (event) => {
    console.log(event.target.value);
    setAtmMode(event.target.value);
    setValidTransaction(false);
    setIsDeposit((event.target.value === 'Deposit') ? true : false);
  };

  return (
    <Form onSubmit={handleSubmit}>
        <h2 style={{color: 'blue'}} id="total">{status}</h2>
        <label>Selecccione una de las siguientes acciones</label>
        <Form.Select aria-label="Select Example" onChange={(e) => handleModeSelect(e)} name="mode" id="mode-select">
          <option id="no-selection" value=""></option>
          <option id="deposit-selection" value="Deposit">Depósito</option>
          <option id="cashback-selection" value="Cash Back">Retiro</option>
        </Form.Select>
        {(atmMode !== "") && (<ATMDeposit onChange={handleChange} isDeposit={isDeposit} isValid={validTransaction}></ATMDeposit>
        )}
    </Form>
  );
};
// ========================================
ReactDOM.render(<Account />, document.getElementById('root'));
