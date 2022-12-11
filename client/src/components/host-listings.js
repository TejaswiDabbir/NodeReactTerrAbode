import React, { useEffect, useState } from 'react';

const HostListings = (props) => {

    const [loading, setLoading] = useState(true);
    const [listings, setListings] = useState([]);
    const userId = '639237c1a0fead10016e489b';

    useEffect(() => {
        setLoading(true);
        fetch('http://localhost:8080/properties/host/' + userId)
            .then(res => res.json())
            .then((data) => {
                console.log(data)
                setListings(data)
                setLoading(false)
            })
            .catch(err => console.log(err));
    }, []);

    return (
        <div className="row">
            {
                loading ?
                    <div> LOADING DATA </div>
                    :
                    <>
                        <ol>
                            {listings.map((listing, index) => (
                                <li key={index} id={listing._id}>{listing.title}</li>
                            ))}
                        </ol>

                    </>
            }
        </div>
    )
};

export default HostListings;