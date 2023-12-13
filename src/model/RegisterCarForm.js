const RegisterCarForm = ({ activeAccount, contract }) => {
    async function isCompany() {
        const companyAddress = await contract.methods.getCompany().call();

        if(activeAccount === companyAddress) {
            return true;
        } else {
            return false;
        }
      }
    
    async function handleSubmit() {
        isCompany = isCompany();
        
        if(isCompany == true) {
            await contract.methods.registerCar(
                document.getElementById("chassisNumber").value,
                document.getElementById("licensePlate").value,
                document.getElementById("manufacturer").value,
                document.getElementById("model").value,
                parseInt(document.getElementById("year").value)
            ).send({from: activeAccount});
        } else {
            alert("Only the company may register cars");
        }
    }

    return (
        <div>
            <form>
                <label htmlFor="chassisNumber"> Chassis number </label><br></br>
                <input type="text" id="chassisNumber" name="chassisNumber"></input><br></br>
                <label htmlFor="licensePlate"> License plate </label><br></br>
                <input type="text" id="licensePlate" name="licensePlate"></input><br></br>
                <label htmlFor="manufacturer"> Manufacturer </label><br></br>
                <input type="text" id="manufacturer" name="manufacturer"></input><br></br>
                <label htmlFor="model"> Model </label><br></br>
                <input type="text" id="model" name="model"></input><br></br>
                <label htmlFor="year"> Year </label><br></br>
                <input type="text" id="year" name="year"></input><br></br>
                <button onClick={handleSubmit}> Register car to blockchain </button>
            </form>
        </div>
    );
}
 
export default RegisterCarForm;