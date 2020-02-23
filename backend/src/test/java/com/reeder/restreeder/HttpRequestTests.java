package com.reeder.restreeder;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.web.server.LocalServerPort;

@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT	)
public class HttpRequestTests {

	@LocalServerPort
	private int port;

	@Autowired
	private TestRestTemplate restTemplate;

	// @Test
	// public void greetingsShouldReturnDefaultMessage() throws Exception {
	// 	assertThat(this.restTemplate.getForObject("http://localhost:" + this.port + "/greeting", String.class))
	// 		.contains("Hello World");
	// }
	//
	// @Test
	// public void greetingsShouldReturnNameInMessage() throws Exception {
	// 	assertThat(this.restTemplate.getForObject("http://localhost:" + this.port + "/greeting", String.class))
	// 		.contains("Hello World");
	// }

}
