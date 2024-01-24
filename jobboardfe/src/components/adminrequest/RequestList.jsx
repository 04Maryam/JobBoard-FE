import React from 'react'

export default function RequestList() {
    const [user, setUser]= useState(props.user);
    const [requests, setRequests] = useState([]);
    const [isEdit, setIsEdit] = useState(false);
    const [currentRequest, setCurrentRequest] = useState({});
    const [userRole, setUserRole] = useState({
        userRole: 'J',
    }
    );

    const requestHeader ={
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("token")
        }
    }

    useEffect(() => {
        //Call API
        loadRequestList();
        }, [])
        
        const loadRequestList =()=> {
            Axios.get("/request/index")
            .then((response)=> {
                console.log(response)
                setRequests(response.data.requests)
            })
            .catch((err)=> {
                console.log(err)
            })
       
        }
  return (
    <div>
        


    </div>
  )
}
