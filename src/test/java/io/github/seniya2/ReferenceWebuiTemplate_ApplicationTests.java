package io.github.seniya2;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.web.WebAppConfiguration;

import reference_webui_template.ReferenceWebuiTemplate_Application;

import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = ReferenceWebuiTemplate_Application.class)
@WebAppConfiguration
public class ReferenceWebuiTemplate_ApplicationTests {

	@Test
	public void contextLoads() {
	}

}
