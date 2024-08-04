// declare a ES6 class
export class Reservation {
    constructor(name, email, phone, guests, date, time, message) {
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.guests = guests;
        this.date = date;
        this.time = time;
        this.message = message;
    }

    // Method to submit reservation data
    submit() {
        const reservationData = {
            name: this.name,
            email: this.email,
            phone: this.phone,
            guests: this.guests,
            date: this.date,
            time: this.time,
            message: this.message
        };

        console.log('Sending reservation data:', reservationData);

        return fetch('https://run.mocky.io/v3/1da41fea-eb4d-4e13-b37a-5dda7ff48b2f', { // Mocky endpoint URL
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(reservationData)
        })
            .then(response => response.json())
            .then(data => {
                console.log('Response from server:', data);
                alert('Reservation received successfully!');
                return data;
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Failed to send reservation. Please try again later.');
                throw error;
            });
    }
}
