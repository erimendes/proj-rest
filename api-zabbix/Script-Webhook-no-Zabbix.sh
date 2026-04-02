try {
    var params = JSON.parse(value),
        req = new HttpRequest(),
        response;

    req.addHeader('Content-Type: application/json');

    // Montando o JSON para o seu endpoint de MONITORAMENTO
    var dto = {
        eventId: params.eventid, // Macro {EVENT.ID}
        host: params.host,       // Macro {HOST.NAME}
        ipAddress: params.ip,    // Macro {HOST.IP}
        triggerName: params.name,// Macro {EVENT.NAME}
        priority: params.severity, // Macro {EVENT.SEVERITY}
        status: "PROBLEM",
        message: "Usuário desabilitado no AD detectado: " + params.username
    };

    Zabbix.log(4, '[ Zabbix Monitoring ] Sending: ' + JSON.stringify(dto));

    response = req.post(params.url, JSON.stringify(dto));

    if (req.getStatus() !== 201 && req.getStatus() !== 200) {
        throw 'Erro: ' + req.getStatus() + ' - ' + response;
    }

    return 'OK';
} catch (error) {
    Zabbix.log(3, '[ Zabbix Monitoring ] Error: ' + error);
    throw 'Falha no envio: ' + error;
}

echo '{
  "eventid": "12345",
  "host": "DC-01-PROD",
  "ipAddress": "192.168.1.10",
  "triggerName": "AD User Account Disabled",
  "priority": "WARNING",
  "status": "PROBLEM",
  "message": "Alerta: O usuário francisco.silva foi desabilitado no AD."
}' | curl -X POST http://localhost:3000/monitoring/zabbix \
     -H "Content-Type: application/json" \
     -d @-