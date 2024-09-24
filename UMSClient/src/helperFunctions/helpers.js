 export const validateForm = (formData,formType) => {
    const newErrors = {};
    if (!formData.username && formType==="signup") {
        newErrors.username = 'Username is required.';
    }
    if (!formData.email) {
        newErrors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Email address is invalid.';
    }
    if (!formData.password) 
    {
        
        newErrors.password = 'Password is required.';
    } else if (formData.password.length < 6 && formType==="signup") {

        newErrors.password = 'Password must be at least 6 characters long.';
    }
    return newErrors;
  };