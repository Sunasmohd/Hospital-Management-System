import styled from 'styled-components'
import './ManagerDoc.css'
const Div = styled.div`
  width: 60%;
  margin-top: 60px;
  border-radius: 4px;
  @media(max-width:800px){
    width:80%;
    margin-top: 30px;
  }
`

const Input = styled.input`
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
'name spec'
'hp dp'
'im im'
'bt bt'

;
column-gap: 35px;
row-gap: 30px;
  @media(max-width:800px){
    grid-template-areas:
    'name'
    'spec'
    'hp'
    'dp'
    'im'
    'bt'

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

const Row = styled.div`
  height:110vh;
  @media(max-width:800px){
    height:120vh;
  }
`

const ManagerDoc = () => {
  return (
    <>
        <Row className="row bg-dark">
        <Div className="container vh-100">
            <FormContainer action="" method="POST" className="bg-light shadow text-dark rounded form-container"
                encType="multipart/form-data">

                <div className="form-group mngdoc-name">
                <Input type="text" className='form-control'/>

                    <Label htmlFor="">Doctor Name</Label>
                </div>

                <div className="form-group mngdoc-spec">
                <Input type="text" className='form-control'/>

                    <Label htmlFor=""> Doctor Specialization</Label>

                </div>

                <div className="form-group mngdoc-hp">

                    {/* {{form.hosp_desc }}  */}
                    <Select>
                    <option value="">---Select---</option>
                    </Select>
                    <Label htmlFor="">Hospital Name</Label>
                    
                </div>

                <div className="form-group mngdoc-dp">
                    <Select>
                    <option value="">---Select---</option>
                    </Select>

                    <Label htmlFor="">Department Name</Label>
                </div>

                <div className="form-group mngdoc-im">
                <Input type="text" className='form-control'/>

                    <Label htmlFor="">Doctor Image</Label>
                </div>


                <FormButton className="mngdoc-bt">Save</FormButton>



            </FormContainer>
        </Div>
    </Row>
    </>
  )
}

export default ManagerDoc