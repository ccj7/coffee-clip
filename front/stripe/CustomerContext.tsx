import { useState, createContext, useContext } from 'react'

const CustomerContext = createContext<any>({})

export const CustomerProvider: React.FC = ({ children }) => {
  const [customer, setCustomer] = useState<any>({
    id: null,
    name: null,
    client_secret: null,
  })

  return (
    <CustomerContext.Provider
      value={{ customer: customer, setCustomer: setCustomer }}
    >
      {children}
    </CustomerContext.Provider>
  )
}

export const useCustomerContext = () => useContext(CustomerContext)
