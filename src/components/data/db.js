export const usersDb = [
    {
      id: "0",
      name: "Alice Hata",
      email: "aliceh@example.com",
      password: "asd123",
      notes: [
        {   
            id: "0",
            status: "done",
            priceHour: "10",
            totalProducts: "20",
            total: "120",
            service: {
                startTime: "2020-11-05T22:00:00.000Z",
                endTime: "2020-11-05T23:00:00.000Z",
                name: "Install camera",
                serviceHour: "10",
                travelCost: "80",
                otherCost: "10",
                totalValue: "100",
            },
             products: [
                {
                    id: "1",
                    name: "Camera cable",
                    description: "Cable model X8-4s 5m",
                    price: "20",
                    quantity: "1",
                    total: "20",
                },
            ],
        },
        {
            id: "1",
            status: "done",
            priceHour: "10.50",
            totalProducts: "39.50",
            total: "150",
            service: {
                startTime: "2020-11-05T18:00:00.000Z",
                endTime: "2020-11-05T19:00:00.000Z",
                name: "Config laptop",
                serviceHour: "10.50",
                travelCost: "90",
                otherCost: "10",
                totalValue: "110.50",
            },
            products: [
                {
                    id:"1",
                    name: "DS. Company",
                    description: "Game",
                    price: "29.50",
                    quantity: "1",
                    total: "29.50",
                }, 
                {
                    id:"2",
                    name: "Combo M. Blade",
                    description: "Game",
                    price: "10.00",
                    quantity: "1",
                    total: "10.00",
                },
            ],
        },
        {
            id: "2",
            status: "done",
            priceHour: "10",
            totalProducts: "0",
            total: "60",
            service: {
                startTime: "2020-11-06T19:00:00.000Z",
                endTime: "2020-11-06T20:00:00.000Z",
                name: "Maintenance",
                serviceHour: "10",
                travelCost: "50",
                otherCost: "0",
                totalValue: "60",
            }, 
            products: [],
        },
        {
            id: "3",
            status: "in progress",
            priceHour: "0",
            totalProducts: "0",
            total: "0",
            service: {
                startTime: "2020-11-27T12:00:00.000Z",
                endTime: "",
                name: "Recover information in pc",
                serviceHour: "10",
                travelCost: "80",
                otherCost: "0",
                totalValue: "0",
            }, 
            products: [],
        },
      ],
    }
];