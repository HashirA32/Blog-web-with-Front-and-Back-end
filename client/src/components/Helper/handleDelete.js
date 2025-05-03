export const deleteData = async (endPoint)=> {
    const c = confirm("Are You sure to delete this category!")
    if(c){
        try {
            const responce = await fetch(endPoint,{
                method: 'delete',
                credentials:'include'
            })
            const data = await responce.json()
            if(!responce.ok){
                throw new Error(responce.statusText)
            }
            return true
        } catch (error) {
            console.log(error)
            return false
        }
    }else {
        return false
    }
} 