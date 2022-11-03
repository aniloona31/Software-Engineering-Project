package com.example.ghumantu.Controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.ghumantu.Dto.MailRequest;
import com.example.ghumantu.Dto.TicketRequest;
import com.example.ghumantu.Dto.TicketResponse;
import com.example.ghumantu.Service.MailService;
import com.example.ghumantu.Service.TicketGenerationService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/ticket")
@AllArgsConstructor
public class TicketGenerationController {
	
	private final TicketGenerationService ticketGenerationService;
	
	@Autowired
	private MailService service;
	
	@PostMapping("/get-ticket")
	public ResponseEntity<TicketResponse>createTicket(@RequestBody TicketRequest payload){
//		System.out.println(payload);
		TicketResponse ticket = ticketGenerationService.generateTicket(payload);
//		System.out.println(ticket);
		Map<String, Object> model = new HashMap<>();
		model.put("placeName", ticket.getPlaceName());
//		System.out.println(model.get("placeName"));
		model.put("userName", ticket.getUsername());
		model.put("quantity", ticket.getQuantity());
		model.put("cost", ticket.getCost());
		model.put("ticketId", ticket.getTicketId());
		
		MailRequest mail = new MailRequest();
		mail.setFrom("placefinder22@gmail.com");
		mail.setTo(ticket.getEmail());
		mail.setSubject("issue ticket");
		mail.setName(ticket.getUsername());
		service.sendEmail(mail,model);
		
		return new ResponseEntity<TicketResponse>(ticket,HttpStatus.OK);
	}
	
}
