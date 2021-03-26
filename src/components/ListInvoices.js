import {
  Get
} from "react-axios";
import Invoice from "./Invoice";
import config from "../config.json";

export default function GetUser() {
  return (
    <div className="ListElements">
      <Get url= {config.SERVER_URL+"/api/invoice-data-json"}>
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
                    key={invoice.id}
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