import React, { useState } from "react"
import { Container, Button, Card } from "@components"
import { Form, Formik, Field, FieldArray } from "formik"
import { api } from "@services/api"

interface ICandidate {
  id: number
  name: string
  skills: string
}

const Home: React.FC = () => {
  const [active, setActive] = useState("register")
  const [candidates, setCandidates] = useState<ICandidate[]>([])
  const [success, setSuccess] = useState("")

  const Tabhandle = (type: string) => setActive(type)
  const handleSubmitCreate = async (values: any, form: any) => {
    const response = await api.post("/candidate", values)
    if (response.data) {
      form.resetForm()
      handleSuccess("Cadastro do candidato feito com sucesso.")
    }
  }

  const handleSubmitFind = async (values: any, form: any) => {
    const response = await api.get("/candidates", {
      params: {
        skills: values.skills.toString(),
      },
    })
    if (response.data) {
      // form.resetForm()
      setCandidates(response.data?.data)
    }
  }

  const handleSuccess = (message: string) => {
    setSuccess(message)

    setTimeout(() => {
      setSuccess("")
    }, 5000)
  }

  return (
    <Container className="p-10">
      <div className="flex gap-5 items-center justify-center">
        <Button
          onClick={() => Tabhandle("register")}
          className={`${active !== "register" ? "bg-gray-500" : "bg-green-500"} hover:bg-green-600 rounded-md`}
        >
          Cadastro
        </Button>
        <Button
          onClick={() => Tabhandle("candidate")}
          className={`${active !== "candidate" ? "bg-gray-500" : "bg-green-500"} hover:bg-green-600 rounded-md`}
        >
          Candidatos
        </Button>
      </div>
      {active === "register" && (
        <Card>
          <h2 className="text-xl font-semibold mb-2 text-center">Cadastro de Candidatos</h2>

          <Formik
            initialValues={{
              name: "",
              skills: [],
            }}
            validate={(values) => {
              const errors: any = {}

              if (!values.name) {
                errors.name = true
              }

              if (!values.skills.length) {
                errors.skills = true
              }

              if (values.skills.length) {
                values.skills.map((item) => {
                  if (!item) {
                    errors.skills = true
                  }
                })
              }

              return errors
            }}
            onSubmit={handleSubmitCreate}
            render={({ values, errors, isValid, handleSubmit }) => {
              return (
                <Form onSubmit={handleSubmit}>
                  <div className="mx-auto max-w-2xl">
                    {success && (
                      <div
                        className="flex items-center bg-green-500 text-white text-sm font-bold px-4 py-3 mb-5"
                        role="alert"
                      >
                        <p>{success}</p>
                      </div>
                    )}
                    <div className="sm:col-span-4">
                      <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                        Nome
                      </label>
                      <div>
                        <div
                          className={`flex rounded-md shadow-sm ring-1 ring-inset focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md ${
                            errors.name ? "ring-red-500" : "ring-gray-300"
                          }`}
                        >
                          <Field
                            type="text"
                            name="name"
                            id="name"
                            key="name"
                            placeholder="ex: Daniel Ramon"
                            className={`block pl-2 flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6`}
                          />
                        </div>

                        <FieldArray
                          name="skills"
                          render={(arrayHelpers) => (
                            <div className={values?.skills.length > 0 ? "pt-5" : ""}>
                              {values?.skills.length > 0 ? (
                                <>
                                  <label
                                    htmlFor="username"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                  >
                                    Skills
                                  </label>
                                  {values.skills.map((skill, index) => (
                                    <div className="flex gap-5 mb-3" key={`skills_${index}`}>
                                      <div
                                        className={`flex flex-1 rounded-md shadow-sm ring-1 ring-inset focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md ${
                                          errors.skills ? "ring-red-500" : "ring-gray-300"
                                        }`}
                                      >
                                        <Field
                                          type="text"
                                          name={`skills.${index}`}
                                          id={`skills.${index}`}
                                          placeholder="ex: javascript"
                                          className="block pl-2 flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        />
                                      </div>
                                      <Button
                                        type="button"
                                        className="bg-red-600 text-sm"
                                        onClick={() => arrayHelpers.remove(index)}
                                      >
                                        -
                                      </Button>
                                      <Button
                                        type="button"
                                        className="bg-green-600 text-sm"
                                        onClick={() => arrayHelpers.insert(index, "")}
                                      >
                                        +
                                      </Button>
                                    </div>
                                  ))}
                                </>
                              ) : (
                                <Button
                                  type="button"
                                  onClick={() => arrayHelpers.push("")}
                                  className="mt-5 bg-indigo-600 hover:bg-indigo-700"
                                >
                                  Adicionar Skills
                                </Button>
                              )}
                              <div className="flex justify-center pt-5">
                                <Button
                                  className={`${
                                    isValid ? "bg-green-500 hover:bg-green-600" : "focus:outline-none bg-gray-300"
                                  }`}
                                  type="submit"
                                  disabled={!isValid}
                                >
                                  Cadastrar
                                </Button>
                              </div>
                            </div>
                          )}
                        />
                      </div>
                    </div>
                  </div>
                </Form>
              )
            }}
          />
        </Card>
      )}

      {active === "candidate" && (
        <>
          <Card>
            <h2 className="text-xl font-semibold mb-2 text-center">Buscar Candidatos</h2>
            <Formik
              initialValues={{
                skills: [""],
              }}
              validate={(values) => {
                const errors: any = {}

                if (!values.skills.length) {
                  errors.skills = true
                }

                if (values.skills.length) {
                  values.skills.map((item) => {
                    if (!item) {
                      errors.skills = true
                    }
                  })
                }

                return errors
              }}
              onSubmit={handleSubmitFind}
              render={({ values, errors, isValid, handleSubmit }) => {
                return (
                  <Form onSubmit={handleSubmit}>
                    <div className="mx-auto max-w-2xl">
                      <div className="sm:col-span-4">
                        <FieldArray
                          name="skills"
                          render={(arrayHelpers) => (
                            <div className={values?.skills.length > 0 ? "pt-5" : ""}>
                              <>
                                <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                                  Skills
                                </label>
                                {values.skills.map((skill, index) => (
                                  <div className="flex gap-5 mb-3" key={`skills_get_${index}`}>
                                    <div
                                      className={`flex flex-1 rounded-md shadow-sm ring-1 ring-inset focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md ${
                                        errors.skills ? "ring-red-500" : "ring-gray-300"
                                      }`}
                                    >
                                      <Field
                                        type="text"
                                        name={`skills.${index}`}
                                        id={`skills.${index}`}
                                        placeholder="ex: javascript"
                                        className="block pl-2 flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                      />
                                    </div>
                                    <Button
                                      type="button"
                                      className="bg-red-600 text-sm"
                                      onClick={() => arrayHelpers.remove(index)}
                                    >
                                      -
                                    </Button>
                                    <Button
                                      type="button"
                                      className="bg-green-600 text-sm"
                                      onClick={() => arrayHelpers.insert(index, "")}
                                    >
                                      +
                                    </Button>
                                  </div>
                                ))}
                              </>
                              <div className="flex justify-center pt-5">
                                <Button
                                  className={`${
                                    isValid ? "bg-green-500 hover:bg-green-600" : "focus:outline-none bg-gray-300"
                                  }`}
                                  type="submit"
                                  disabled={!isValid}
                                >
                                  Procurar
                                </Button>
                              </div>
                            </div>
                          )}
                        />
                      </div>
                    </div>
                  </Form>
                )
              }}
            />
          </Card>

          {candidates.length > 0 && (
            <Card>
              <ul role="list" className="divide-y divide-gray-100">
                {candidates.map((candidate) => (
                  <li key={`${candidate.name}_${candidate.id}`} className="flex justify-between gap-x-6 py-5">
                    <div className="flex min-w-0 gap-x-4 items-center">
                      <img
                        className="h-12 w-12 flex-none rounded-full bg-gray-50"
                        src="https://dummyimage.com/80x80/cccccc/cccccc.jpg"
                        alt={candidate.name}
                      />
                      <div className="min-w-0 flex-auto">
                        <p className="text-sm font-normal leading-6 text-gray-900">
                          Nome: <span className="text-sm font-bold leading-6 text-gray-800">{candidate.name}</span>
                        </p>
                      </div>
                    </div>
                    <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                      <p className="text-sm leading-6 text-gray-900">skills</p>
                      {candidate.skills?.split(",").map((item) => (
                        <span className="mt-1 text-xs leading-5 text-gray-500">{item} </span>
                      ))}
                    </div>
                  </li>
                ))}
              </ul>
            </Card>
          )}
        </>
      )}
    </Container>
  )
}

export default Home
