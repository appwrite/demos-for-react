import { Routes, Route } from "react-router-dom"
import Layout from './components/layout'
import Home from "./components/home"

import LocaleLayout from "./components/locale/layout"
import Locale from "./components/locale/locale"
import Countries from "./components/locale/countries"
import EUCountries from "./components/locale/eucountries"
import Phones from "./components/locale/phones"
import Continents from "./components/locale/continents"
import Currencies from "./components/locale/currencies"
import Languages from "./components/locale/languages"
import All from "./components/locale/all"

import Todos from "./components/databases/todos"

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/locale" element={<LocaleLayout />} >
          <Route path="/locale" element={<Locale />} />
            <Route path="/locale/countries" element={<Countries />} />
            <Route path="/locale/eu-countries" element={<EUCountries />} />
            <Route path="/locale/phone-codes" element={<Phones />} />
            <Route path="/locale/continents" element={<Continents />} />
            <Route path="/locale/currencies" element={<Currencies />} />
            <Route path="/locale/languages" element={<Languages />} />
            <Route path="/locale/all" element={<All />} />
          </Route>
        </Route>
          <Route path="/databases" element={<Todos />} />
      </Routes>
    </>
  )
}

export default App
