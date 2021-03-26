import {
  Get
} from "react-axios";
import Invoice from "./Invoice";

export default function GetUser() {
  return (
    <div className="ListElements">
      <Get url="http://192.168.1.219/api/invoice-data-json">
        {(error, response, isLoading, makeRequest, axios) => {
          if (error) {
            return (
              <div>
                Something bad happened: {error.message}{" "}
                <button
                  onClick={() => makeRequest({ params: { reload: true } })}
                >
                  Retry
                </button>
              </div>
            );
          } else if (isLoading) {
            return <div>Loading...</div>;
          } else if (response !== null) {
            return (
              <div>
                <div>
                  {response.data.map((invoice)=>
                    <Invoice
                    id={invoice.id}
                    name={invoice.Name}
                    priceNet={invoice.PriceNet}
                    priceGross={invoice.PriceGross}
                    vat={invoice.Vat}
                    userClearing={invoice.UserClearing}
                    clearingDate={invoice.ClearingDate}
                    />
                  )}
                </div>
              </div>
            );
          }
          return <div>Default message before request is made.</div>;
        }}
      </Get>
    </div>
  );
}