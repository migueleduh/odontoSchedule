export type Status = 'confirmado' | 'agendado' | 'cancelado' | 'realizado' | 'falta';

export type agendamento = {
    id:string;
    dentista_fk: string;
    paciente_fk: string;
    procedimento: string;
    data_hora_fim: string;
    status: Status;
    data_horario:string;
    paciente?: { nome: string } | null;
    dentista?: { nome: string } | null;
}
