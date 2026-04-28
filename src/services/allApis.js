import commonApi from "./commonApi";
import base_url from "./base_url";



//signup api request

export const signupApi=async(data)=>{
    return await commonApi(`${base_url}/signup`,'POST',data,'')
}

export const signinApi=async(data)=>{
    return await commonApi(`${base_url}/signin`,'POST',data,'')
}

//Google Signin Api
export const googleSigninApi=async(data)=>{
    return await commonApi (`${base_url}/google-login`,'POST',data,"")
}

//Authorized user Based apis

//Add Book Api


export const addBookApi=async(data)=>{
  const header={
    "Authorization":`Token ${sessionStorage.getItem('token')}`,
    "Content-Type":"multipart/form-data"
  }
  return await commonApi(`${base_url}/add-book`,'POST',data,header)
}

export const allBooksApi=async(search)=>{
    const header={
        "Authorization":`Token ${sessionStorage.getItem('token')}`
    }
    return await commonApi(`${base_url}/all-book?search=${search}`,'GET',{},header)
}

//getBookById Api 

export const getBookByIdApi=async(id)=>{
    const header={
        "Authorization":`Token ${sessionStorage.getItem('token')}` 
         
    }
    return await commonApi(`${base_url}/getBookbyid/${id}`,'GET',{},header)
}


export const latestBooks = async () => {
    return await commonApi(`${base_url}/latest-book`, 'GET', {},'')
}

export const getUserBooksApi=async()=>{
    const header={
        "Authorization":`Token ${sessionStorage.getItem('token')}`
    }
    return await commonApi(`${base_url}/getuserbooks`,'GET',{},header)
}

export const removeUserBookApi=async(id)=>{
    const header={
        "Authorization":`Token ${sessionStorage.getItem('token')}`
    }
    return await commonApi(`${base_url}/delete-books/${id}/delete`,'DELETE',{},header)
}

export const getBoughtBooksApi=async()=>{
    const header={
        "Authorization":`Token ${sessionStorage.getItem('token')}`
    }
    return await commonApi(`${base_url}/purchased-books`,'GET',{},header)
}


//profile update

//get profile API
export const getProfileApi = async()=>{
     const header={
        "Authorization": `Token ${sessionStorage.getItem('token')}`
    }
    return await commonApi(`${base_url}/get-profile`,'GET',{},header)
}

//profile update
export const profileUpdateApi = async(data)=>{
     const header = {
        "Authorization":`Token ${sessionStorage.getItem('token')}`,
        "Content-Type":"multipart/form-data"
    }
    return await commonApi(`${base_url}/profile-update`,'PUT',data,header)
}


export const applyJobPostApi=async(data)=>{
    const header={
        "Authorization":`Token ${sessionStorage.getItem('token')}`,
        "Content-Type":"multipart/form-data"
    }
          return await commonApi(`${base_url}/apply-job`,'POST',data,header)

}


//list Job post
export const ListJobPostApi=async(search)=>{
    const header={
        "Authorization":`Token ${sessionStorage.getItem('token')}`
    }
    return await commonApi(`${base_url}/list-jobpost?search=${search}`,'GET',{},header)
}


//purchase 

export const purchaseBookApi=async(data)=>{
    const header={
        "Authorization":`Token ${sessionStorage.getItem('token')}`,

    }
        return await commonApi(`${base_url}/purchase-book`,'POST',data,header)

}


//get admin all books Api
export const getAdminAllBooksApi = async()=>{
     const header = {
        "Authorization":`Token ${sessionStorage.getItem('token')}`,
    }
    return await commonApi(`${base_url}/admin/get-books`,'GET',{},header)
}

//get admin all users Api
export const getAdminAllUsersApi = async()=>{
      const header = {
        "Authorization":`Token ${sessionStorage.getItem('token')}`,
    }
    return await commonApi(`${base_url}/admin/get-users`,'GET',{},header)
}

//approve books
 export const adminApproveBookApi=async(id)=>{
    const header={
        "Authorization":`Token ${sessionStorage.getItem('token')}`
    }
      return await commonApi(`${base_url}/admin/approve-book/${id}`,'PATCH',{},header)
 }


 export const adminAddJobPostApi=async(data)=>{
    const header={
        "Authorization":`Token ${sessionStorage.getItem('token')}`
    }
      return await commonApi(`${base_url}/admin/add-jobpost`,'POST',data,header)
 

 }

 export const adminListJobPostApi=async(search)=>{
    const header={
        "Authorization":`Token ${sessionStorage.getItem('token')}`
    }
      return await commonApi(`${base_url}/admin/list-jobpost?search=${search}`,'GET',{},header)
 
 }

 export const adminDeleteJobPostApi=async(id)=>{
    const header={
        "Authorization":`Token ${sessionStorage.getItem('token')}`
    }
      return await commonApi(`${base_url}/admin/delete-jobpost/${id}`,'DELETE',{},header)
 

 }

 export const getAdminApplicationApi=async()=>{
    const header={
        "Authorization":`Token ${sessionStorage.getItem('token')}`
    }
          return await commonApi(`${base_url}/admin/list-applyjob`,'GET',{},header)

 }

