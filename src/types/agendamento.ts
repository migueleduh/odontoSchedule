export type Status = 'confirmado' | 'agendado' | 'cancelado' | 'realizado' | 'falta';

export type agendamento = {
    dentista_fk: string;
    paciente_fk: string;
    procedimento: string;
    data_hora_fim: string;
    status: Status;
    data_horario:string;
}
