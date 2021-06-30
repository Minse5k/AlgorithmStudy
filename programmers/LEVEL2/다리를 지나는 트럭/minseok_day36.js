function solution(bridge_length, weight, truck_weights) {
    let time = 1;
    let bridgeWeight = truck_weights[0];
    const bridgeTruck = [[truck_weights.shift(), 0]];
    
    while(truck_weights.length > 0) {
        if(time - bridgeTruck[0][1] === bridge_length) {
            const [truckWeight, t] =  bridgeTruck.shift();
            bridgeWeight -= truckWeight;
        }
        if(bridgeWeight + truck_weights[0] <= weight) {
            bridgeWeight += truck_weights[0];
            bridgeTruck.push([truck_weights.shift(), time]);
        }
        time++;
    }
    
    while(bridgeTruck.length > 0) {
        if(time - bridgeTruck[0][1] === bridge_length) {
            bridgeTruck.shift();        
        }
        time++;
    }
    
    return time;
}