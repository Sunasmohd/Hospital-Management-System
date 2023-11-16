import styled from 'styled-components'
import './ManagerHosp.css'
const Div = styled.div`
  width: 60%;
  margin-top: 60px;
  border-radius: 4px;
  @media(max-width:800px){
    width:80%;
    margin-top: 10px;
  }
`;

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
'name loc'
'desc desc'
'im im'
'bt bt'

;
column-gap: 35px;
row-gap: 30px;
  @media(max-width:800px){
    grid-template-areas:
    'name'
    'loc'
    'desc'
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

const ManagerHosp = () => {
  return (
    <>
        <div className="row bg-dark">
        <Div className="container vh-100">
            <FormContainer action="" method="POST" className="bg-light shadow text-dark rounded form-container"
                encType="multipart/form-data">

                <div className="form-group mnghosp-name">
                <Input type="text" className='form-control'/>

                    <Label htmlFor="">Hospital Name</Label>
                </div>

                <div className="form-group mnghosp-loc">
                <Input type="text" className='form-control'/>

                    <Label htmlFor=""> Hospital Location</Label>

                </div>

                <div className="form-group mnghosp-desc">

                    {/* {{form.hosp_desc }}  */}
                    <Input type="text" className='form-control'/>
                    <Label htmlFor="">Hospital Description</Label>
                    
                </div>

                <div className="form-group mnghosp-im">
                <Input type="text" className='form-control'/>

                    <Label htmlFor="">Hospital Image</Label>
                </div>



                <FormButton className="mnghosp-bt">Save</FormButton>



            </FormContainer>
        </Div>
    </div>
    </>
  )
}

export default ManagerHosp