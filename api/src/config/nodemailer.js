const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "devapps2211@gmail.com",
    pass: "spxywipsrxjokqig",
  },
});

transporter.verify().then(() => {
  console.log("Lista la configuracion para enviar correos");
});

const mailActivateAccount = async (name, email, urlserver, token) => {
  await transporter.sendMail({
    from: "PF-Henry <rubendario981@gmail.com",
    to: email,
    subject: "Activa tu cuenta en E-commerce Cell-world",
    html: `
		  <h2>Hola usuario ${name}</h2>
		  <h4>Gracias por registrarte en nuestra pagina</h4>
		  <hr />
		  <div>
			<p>Para activar tu cuenta haz clic en el enlace 👇</p>
			<a href="${urlserver}activateAccount?token=${token}" target="_blank" rel="noopener noreferrer">
			  ${urlserver}activateAccount?token=${token}
			</a>
			<p>Atentamente</p>
			<p>Tus amigos de Cell-world</p>
		  </div>        
		`,
  });
};

const mailToRecoveryPassword = async (email, name, urlClient) => {
  await transporter.sendMail({
    from: "PF-Henry <rubendario981@gmail.com",
    to: email,
    subject: "Recuperar contraseña en E-commerce Cell-world",
    html: `
		  <h2>Hola usuario ${name}</h2>
		  <h4>Has olvidado tu contraseña??</h4>
		  <hr />
		  <div>
			<p>Parece que has olvidado tu contraseña, pero no imoprta, para recuperar tu cuenta haz clic en el enlace 👇</p>
			<a href="${urlClient}setNewPassword" target="_blank" rel="noopener noreferrer">
			Recupera tu cuenta aqui!!!
			</a>
			<p>El enlace tiene una validez de 10 minutos</p>
		  	<hr />
		  	<h3>Atentamente</h3>
			<p>Tus amigos de Cell-world</p>
		  </div>        
		`,
  });
};

const BuyCart = async (email, name, total) => {
  let a = 4;
  await transporter.sendMail({
    from: "PF-Henry <rubendario981@gmail.com",
    to: email,
    subject: "Comfirmacion de pago",
    html: `
  	  <h2>Hola ${name}</h2>
  	  <h4>Gracias por la compra en nuestra pagina</h4>
		<h5>El tiempo estimado para recibir su compra es de 2 semanas.<h5>
  	  <hr />
  	  <div>
		<p>Atentamente</p>
		<p>Tus amigos de Cell-world</p>
  	  </div>
		`,
  });
};

module.exports = {
  transporter,
  mailActivateAccount,
  BuyCart,
  mailToRecoveryPassword,
};
