export function validateName(name: string): string | undefined {
  if (!name.trim()) return 'Nome é obrigatório'
  if (name.trim().length < 2) return 'Nome deve ter pelo menos 2 caracteres'
  return undefined
}

export function validateEmail(email: string): string | undefined {
  if (!email.trim()) return 'Email é obrigatório'
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) return 'Email inválido'
  return undefined
}

export function validatePassword(password: string): string | undefined {
  if (!password) return 'Senha é obrigatória'
  if (password.length < 6) return 'Senha deve ter pelo menos 6 caracteres'
  return undefined
}

export function validatePetName(nome: string): string | undefined {
  if (!nome.trim()) return 'Nome é obrigatório'
  if (nome.trim().length < 2) return 'Nome deve ter pelo menos 2 caracteres'
  return undefined
}

export function validatePetType(tipo: string): string | undefined {
  if (!tipo.trim()) return 'Tipo é obrigatório'
  if (tipo.trim().length < 2) return 'Tipo deve ter pelo menos 2 caracteres'
  return undefined
}

export function validatePetAge(anos: number, meses: number): string | undefined {
  if (anos < 0) return 'Anos deve ser maior ou igual a 0'
  if (meses < 0 || meses > 11) return 'Meses deve ser entre 0 e 11'
  if (anos === 0 && meses === 0) return 'Informe pelo menos a idade em anos ou meses'
  return undefined
}

export function validatePetSex(sexo: string): string | undefined {
  if (!sexo) return 'Sexo é obrigatório'
  if (!['macho', 'femea'].includes(sexo)) return 'Sexo deve ser macho ou fêmea'
  return undefined
}
