package io.github.seniya2.foo;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Foo {

	@GeneratedValue
	@Id
	public long id;
	
	public String name;
	public String value;
	
}
