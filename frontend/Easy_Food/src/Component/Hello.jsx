import React, { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';




const FileUploadForm = () => {
  const [formData, setFormData] = useState({
    productName: '',
    productPrice: '',
    file: null,
  });
const [data,setData]=useState()

  useEffect(()=>{
    fetchData();
  },[formData])

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3005/api/v1/view');

      setData(response.data);
    } catch (error) {
      alert('Error: ', error);
    }
  };



  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      file: file,
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    const formDatas = new FormData();
    formDatas.append('file', formData.file);
    formDatas.append('productName', formData.productName);
    formDatas.append('productPrice', formData.productPrice);

    await axios.post('http://localhost:3005/add',formDatas).then((res) => {
    }).catch((err) => {
      alert(err)
    });

  setFormData({
    productName: '',
    productPrice: '',
    file: null,
  });
  document.getElementById('yourFormId').reset();
  };

  return (
    <>
    <form  id="yourFormId" onSubmit={handleSubmit} method='POST'>
      <label>
        Product Name:
        <input
          type="text"
          name="productName"
          value={formData.productName}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Product Price:
        <input
          type="text"
          name="productPrice"
          value={formData.productPrice}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Upload File:
        <input type="file" name='file' onChange={handleFileChange} />
      </label>
      <br />
      <button type="submit">Submit</button>
    </form>
    
    <div>
      {data?.map((item)=>{
        console.log("sssssssssss");
        return(
          <>

          <div>
            
            <h4>{item.price}</h4>
            <h4>{item.product_name}</h4>
           <img src={`http://localhost:3005/Images/${item.image}`} alt="image" />
          
          </div>

          </>

        )
      })}
    </div>
    </>
    

  );
};

export default FileUploadForm;
