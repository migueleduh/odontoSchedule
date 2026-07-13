export type Status = 'confirmado' | 'agendado' | 'cancelado' | 'realizado' | 'falta';

export type agendamento = {
    dentista: string;
    paciente: string;
    procedimento: string;
    data_hora: string;
    status: Status;
}
