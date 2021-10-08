import React, { FC, useState } from "react";
import { Route, RouteComponentProps, Switch, useHistory } from "react-router-dom";
import './App.css';
import {AuthenticatedTemplate, UnauthenticatedTemplate, useIsAuthenticated, useMsal} from "@azure/msal-react";
import { InteractionStatus } from "@azure/msal-browser";
import { ApiUser } from "./types/api.types";
import { defaultMeApiInstance } from "./apis/users.api";

const App: FC = () => {
  const history = useHistory();
  const isAuthenticated = useIsAuthenticated();
  const { accounts, inProgress } = useMsal();
  const [currentUser, setCurrentUser] = useState<ApiUser | undefined>();

  React.useEffect(() => {
    async function fetchData() {
      try {
        const result = await defaultMeApiInstance.getMyUserAsync();
        setCurrentUser(result);
      } catch (error: any) {
        console.error(error);
      }
    }

    if (isAuthenticated && accounts && accounts.length && inProgress === InteractionStatus.None) {
      fetchData();
    }
  }, [isAuthenticated, accounts, history]);

  return (
    <div className="App">      
      <AuthenticatedTemplate>
        <p>User is logged in</p>
        {currentUser && <p>Current User: {currentUser.firstName + ' ' + currentUser.lastName}</p> }
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        <p>Please sign in</p>
      </UnauthenticatedTemplate>
    </div>
  );
}

export default App;
