import styled from "styled-components";
import "./Timings.css";

const Div = styled.div`
  width: 60%;
  margin-top: 110px;
  border-radius: 4px;
  @media(max-width:800px){
    width:80%;
  }
`;

const Select = styled.select`
  width: 100%;
  color: rgb(0, 0, 0);
  background-color: rgb(232, 232, 232);
  border: 1px solid rgba(251, 251, 251, 0.9);
  height: 40px;
  width: 100%;
  padding-left: 10px;
  border-radius: 0px;
  border-radius: 4px;
`;

const Label = styled.label`
  color: rgb(6, 6, 6);
  padding-top: 8px;
  padding-left: 2px;
  font-family: Poppins;
  font-size: 13px;
  padding-top: 8px;
  padding-left: 2px;
`;

const FormContainer = styled.form`
  padding: 80px 50px 70px 50px;
  display: grid;
  grid-template-areas:
    "doc doc"
    "time token"
    "bt bt";
  column-gap: 35px;
  row-gap: 30px;
  @media(max-width:800px){
    grid-template-areas:
    "doc"
    "time"
    "token"
    "bt";
  }
`;

const FormButton = styled.button`
  height: 40px;
  color: rgb(255, 255, 255);
  font-size: 15px;
  background-color: rgb(57, 147, 165);
  border-radius: 0px;
  border-radius: 4px;
  margin: auto;
  margin-bottom: 0;
  border: 0;
  width:30%;

  @media(max-width:800px){
    width:100%;
  }
`;

const timings = () => {
  return (
    <div className="row bg-dark ">
      <Div className="container  vh-100">
        <FormContainer
          action=""
          method="POST"
          className="bg-light p-5 form-container"
        >
          {/* {% if action == 'update' %} */}
          {/* <div className="form-group tkn-doc">
                            
                        <Select name="DocSelect" id="">
                            <option value="">---Select---</option>
            
                            <option value="{{doc.id}}"></option>


                        </Select>
                        
                    <Label htmlFor="">Doctor</Label>
                </div>

                <div className="form-group tkn-time">
                
                    <Select name="TimingSelect" id="">
                        <option value="">---Select---</option>
        
                        
                            <option value="{{a.0}}"></option>
                            

                    </Select>
                    
                <Label htmlFor="">Timing</Label>

                </div> */}
          <div className="form-group tkn-doc">
            <Select name="DocSelect" id="">
              <option value="">---Select---</option>

              <option value="{{doc.id}}"></option>
            </Select>

            <Label htmlFor="">Doctor</Label>
          </div>

          <div className="form-group tkn-time">
            <Select name="TimingSelect" id="">
              <option value="">---Select---</option>

              <option value="{{a.0}}"></option>
            </Select>

            <Label htmlFor="">Timing</Label>
          </div>
          <div className="form-group tkn-token">
            <input type="text" className="form-control" />
            <Label htmlFor="">Token</Label>
          </div>

          <FormButton className="tkn-bt">Save</FormButton>
        </FormContainer>
      </Div>
    </div>
  );
};

export default timings;
