package reference_webui_template.organization;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToOne;

@Entity
public class Employee {

	@GeneratedValue
	@Id
	public Long id;
	
	public String name;
	public String email;
	public String tel;
	public String description;
	
	
	@OneToOne
	public Position position;
}
