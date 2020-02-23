const onGetPositionSacces = location => {
    console.log(location)
}

navigator.geolocation.getCurrentPosition(onGetPositionSacces)