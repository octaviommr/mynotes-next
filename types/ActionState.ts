export interface ActionState {
  error?: string
}

export interface FormActionState<T> extends ActionState {
  validationErrors?: T
}
