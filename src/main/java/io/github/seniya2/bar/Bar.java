package io.github.seniya2.bar;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class Bar {

	@Id
	public String id;
	
	public String name;
	public String value;
	
}
